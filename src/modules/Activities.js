import { getActivities } from "../data/ActivitiesAPI.js";
import { create } from "../utils/create.js";
import { set } from "../utils/set.js";

const colorVariants = [
  { bg: "bg-orange", pill: "bg-primary-red" },
  { bg: "bg-light-green", pill: "bg-dark-green" },
  { bg: "bg-yellow", pill: "bg-dark-yellow" },
  { bg: "bg-[#2563eb]/20", pill: "bg-[#2563eb]" },
];

export async function ActivitiesModule() {
  try {
    const activities = await getActivities();
    const container = create(
      "section",
      `
      module activities-module
      w-full max-w-[2600px] mx-auto
      bg-secondary-white/50 text-white
      flex flex-col justify-start
      `
    );

    const heading = create(
      "h2",
      `
      text-center font-black tracking-[0.25em]
      text-primary-red
      text-[72px]
      m-0 mb-16
      `
    );
    heading.textContent = "SKEMA";
    set(heading, container);

    const now = new Date();

    const Activities = activities.filter(
      (a) => new Date(a.startDate) > now
    );

  // fredag

    const today = now.getDay(); 
    let showWeekendMessage = false;

    if (upcomingActivities.length === 0) {
      if (today === 6 || today === 0) {
        
        showWeekendMessage = true;
      } else if (today === 5) {
      
        const fridayActivities = activities
          .filter((a) => new Date(a.startDate).getDay() === 5)
          .map((a) => new Date(a.startDate).getTime() + 60 * 60000); // 60 min default duration

        const lastLectureEnd = fridayActivities.length
          ? Math.max(...fridayActivities)
          : 0;

        if (now.getTime() >= lastLectureEnd) showWeekendMessage = true;
      }
    }

    if (showWeekendMessage) {
      const weekendDiv = create(
        "div",
        `
        text-center text-6xl font-bold
        text-primary-red py-20
        `
      );
      weekendDiv.textContent = "God weekend!";
      set(weekendDiv, container);
      return container;
    }

   //fredag ende

    activities.slice(0, 10).forEach((activity, index) => {
      const variant = colorVariants[index % colorVariants.length];

      const item = create(
        "div",
        `
        flex items-center justify-between
        ${variant.bg}
        rounded-full
        px-10 py-8
        mb-8
        transition-transform duration-200 hover:scale-[1.02]
        `
      );

      const room = create(
        "div",
        `
        ${variant.pill}
        rounded-full text-center font-semibold text-white
        w-[200px]
        px-6 py-4
        text-4xl
        truncate
        `
      );
      room.textContent = activity.room;

      const middle = create(
        "div",
        `
        flex flex-1 items-center
        gap-10 px-10
        `
      );

      const team = create(
        "div",
        `
        text-4xl font-semibold tracking-wide
        `
      );
      team.textContent = activity.team;

      const subject = create(
        "div",
        `
        text-3xl font-light opacity-90
        `
      );
      subject.textContent = activity.subject;

      set([team, subject], middle);

      const time = create(
        "div",
        `
        text-3xl font-semibold text-white
        min-w-[140px] text-right
        `
      );
      time.textContent = formatTime(activity.startDate);

      set([room, middle, time], item);
      set(item, container);
    });

    return container;
  } catch (error) {
    console.error(error);

    const errorDiv = create(
      "div",
      `
      rounded-3xl bg-primary-red text-white
      p-10 text-4xl text-center
      `
    );
    errorDiv.textContent = "AKTIVITETER - utilgængelig";
    return errorDiv;
  }
}

function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}