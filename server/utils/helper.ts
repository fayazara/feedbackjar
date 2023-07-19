export const useHelper = () => {
  const getBrowser = (event: any) => {
    const { headers } = event.req;
    return headers["user-agent"];
  };

  const dateDiffInDays = (start: Date, end: Date) => {
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const startDateInUtc = Date.UTC(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );
    const endtDateInUtc = Date.UTC(
      end.getFullYear(),
      end.getMonth(),
      end.getDate()
    );

    return Math.floor((endtDateInUtc - startDateInUtc) / oneDay);
  };

  return {
    getBrowser,
    dateDiffInDays,
  };
};
