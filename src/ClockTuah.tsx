import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import styles from "./ClockTuah.module.css";

dayjs.extend(advancedFormat);
dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.extend(utc);

const units = {
  Year: "Y",
  Month: "M",
  Week: "ww",
  Day: "D",
  Hour: "H",
  Minute: "m",
  Second: "s",
};

interface ClockProps {
  time: Dayjs;
}

export const ClockTuah: FC<ClockProps> = (props) => {
  const { time } = props;

  const diff = useCallback(() => dayjs.duration(time.diff(dayjs())), [time]);
  const [timeTill, setTimeTill] = useState(diff());

  useEffect(() => {
    const intrvl = setInterval(() => {
      setTimeTill(diff());
    }, 1000);

    return () => {
      clearInterval(intrvl);
    };
  }, [diff]);

  return (
    <div className={styles.ClockTuah}>
      <h3>{time.format("MMMM Do YYYY @ hh:mmA")}</h3>
      {Object.entries(units).map(([unit, formatCode]) => {
        const t = Number(timeTill.format(formatCode));
        return t >= 1 || formatCode === "s" ? (
          <span key={formatCode}>
            {timeTill.format(formatCode)} {unit}
            {t === 1 ? "" : "s"}
          </span>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export default ClockTuah;
