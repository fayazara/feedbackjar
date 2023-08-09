import { and, eq, between, sql, desc } from "drizzle-orm";
import {
  getFeedbackCountOfProject,
  feedbackCountByStatus,
  feedbackCountByCategory,
  countForStatus,
} from "../../../db/query/analytics";
import { getFeedbacks } from "../../../db/query/feedback";
import { Feedback } from "../../../../lib/types/project";

// /api/projects/1/overview

// {
//   stats: {
//     total,
//     countByStatus,
//     countByCategory,
//     open,
//     closed,
//   },
//   feedbacks: []
// }

export default eventHandler(async (event) => {
  const session = await requireUserSession(event);
  const userId = session.user.id;

  /*
    Daily -> Hourly stats
    Weekly -> Daywise stats
    Monthly -> Weekly stats
    Yearly -> Monthly stats
  */

  const { getProjectId, getDateRangeFilter } = useValidation(event);
  const projectId = await getProjectId();
  const { start, end } = await getDateRangeFilter();

  const { dateDiffInDays } = useHelper();
  const days = dateDiffInDays(start, end);

  let selectColumns: any = {
    count: sql<number>`count(1)`,
  };
  let dateFormatter = null;
  let groupBy = null;

  if (days <= 1) {
    // calculate hourly in sql
    dateFormatter = "%H";
    selectColumns[
      "hour"
    ] = sql<number>`strftime(${dateFormatter}, datetime(${tables.feedbacks.createdAt},'unixepoch'))`;
  } else if (days <= 7) {
    // calculate daily
    dateFormatter = "%Y-%m-%d";
    selectColumns[
      "day"
    ] = sql<number>`strftime(${dateFormatter}, datetime(${tables.feedbacks.createdAt},'unixepoch'))`;
  } else if (days <= 30) {
    // calculate weekly
    dateFormatter = "%Y-%m-%d";
    selectColumns[
      "day"
    ] = sql<number>`strftime(${dateFormatter}, datetime(${tables.feedbacks.createdAt},'unixepoch'))`;
  } else {
    // calculate monthly
    dateFormatter = "%Y-%m";
    selectColumns[
      "month"
    ] = sql<number>`strftime(${dateFormatter}, datetime(${tables.feedbacks.createdAt},'unixepoch'))`;
  }

  let filterBy: any = and(
    eq(tables.feedbacks.userId, userId),
    eq(tables.feedbacks.projectId, projectId),
    between(tables.feedbacks.createdAt, start, end)
  );
  groupBy = sql<number>`strftime(${dateFormatter}, datetime(${tables.feedbacks.createdAt},'unixepoch'))`;

  const feedbackCount = await getFeedbackCountOfProject(
    selectColumns,
    filterBy,
    groupBy
  );
  const countByStatus = await feedbackCountByStatus(filterBy);
  const countByCategory = await feedbackCountByCategory(filterBy);
  const open = await countForStatus(userId, "active");
  const closed = await countForStatus(userId, "closed");

  const feedbacks: Feedback[] = await getFeedbacks(
    {
      id: tables.feedbacks.id,
      userId: tables.feedbacks.userId,
      userEmail: tables.feedbacks.userEmail,
      userName: tables.feedbacks.userName,
      category: tables.feedbacks.category,
      projectId: tables.feedbacks.projectId,
      feedback: tables.feedbacks.feedback,
      status: tables.feedbacks.status,
      createdAt: tables.feedbacks.createdAt,
      updatedAt: tables.feedbacks.updatedAt,
    },
    filterBy,
    desc(tables.feedbacks.updatedAt),
    1,
    20
  );

  const result = {
    stats: {
      feedbackCount,
      countByStatus,
      countByCategory,
      open: open.length,
      closed: closed.length,
    },
    feedbacks
  };

  return result;
});

// Weekly calculation
// SELECT idx, COUNT(idx)
// FROM
//     (SELECT ((created_at-min)/(60*60*24*7)) AS idx
//     FROM
//          (SELECT min(created_at) AS min
//          FROM feedbacks)
//     LEFT JOIN feedbacks WHERE created_at NOT NULL)
// GROUP BY idx;

// SELECT strftime('%Y-%W', datetime(created_at,'unixepoch')) AS w, count(1) FROM feedbacks GROUP BY w;
