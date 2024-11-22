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
      <span className={styles.attribution}>
        Model by{" "}
        <a href="https://sketchfab.com/shuvalov.di">sketchfab:shuvalov.di</a> (
        <a href="https://sketchfab.com/3d-models/tailors-scissors-2318ed5e22a2420a9ddaa914333f8fbf">
          src
        </a>
        )
      </span>
    </main>
  );
};

export default App;
