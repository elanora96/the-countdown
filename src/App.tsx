import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { FC } from "react";

import styles from "./App.module.css";

import ClockTuah from "./ClockTuah";
import TheSnip from "./TheSnip";

dayjs.extend(timezone);
dayjs.extend(utc);

const App: FC = () => {
  const theDay = dayjs.tz("2024-12-02 05:30:00", "America/Los_Angeles");

  return (
    <main>
      <ClockTuah time={theDay} />
      <TheSnip className={styles.snip} />
    </main>
  );
};

export default App;
