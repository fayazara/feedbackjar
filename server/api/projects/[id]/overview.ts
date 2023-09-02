import { and, eq, sql, desc } from "drizzle-orm";
import {
  getFeedbackCountOfProject,
  feedbackCountByStatus,
  feedbackCountByCategory,
  countForStatus,
} from "@/server/db/query/analytics";

import { getFeedbacks } from "@/server/db/query/feedback";
import { getProject } from "@/server/db/query/project";
import { Feedback, Project } from "@/lib/types/project";

export default eventHandler(async (event) => {
  const session = await requireUserSession(event);

  const { getProjectId } = useValidation(event);
  const projectId = await getProjectId();

  let filterBy: any = and(eq(tables.feedbacks.projectId, projectId));

  const feedbackCount = await getFeedbackCountOfProject(filterBy);
  const countByStatusQs = await feedbackCountByStatus(filterBy);
  const countByCategoryQs = await feedbackCountByCategory(filterBy);
  let countByStatus: any = {};
  for (const entry of countByStatusQs) {
    const { status, count } = entry;
    countByStatus[status] = count;
  }

  let countByCategory: any = {};
  for (const entry of countByCategoryQs) {
    const { category, count } = entry;
    countByCategory[category] = count;
  }

  const feedbacks: Feedback[] = await getFeedbacks(
    "",
    filterBy,
    desc(tables.feedbacks.createdAt),
    0,
    20
  );

  const project: Project = await getProject(projectId);

  const result = {
    stats: {
      feedbackCount: feedbackCount.length,
      ...countByStatus,
      ...countByCategory,
    },
    feedbacks,
    project,
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
