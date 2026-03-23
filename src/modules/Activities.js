import { getActivities } from "../data/ActivitiesAPI.js";
import { create } from "../utils/create.js";
import { set } from "../utils/set.js";

const colorVariants = [
  { bg: "bg-orange", pill: "bg-primary-red" },
  { bg: "bg-light-green", pill: "bg-dark-green" },
  { bg: "bg-yellow", pill: "bg-dark-yellow" },
  { bg: "bg-light-blue", pill: "bg-dark-blue" },
];

export async function ActivitiesModule() {
  try {
    const activities = await getActivities();

    const container = create(
      "section",
      "module activities-module bg-secondary-white/50"
    );

    const heading = create(
      "h2",
      "m-0 mb-16 pt-12 text-center text-[72px] font-black tracking-[0.25em] text-primary-red"
    );
    heading.textContent = "SKEMA";
    set(heading, container);

    activities.slice(0, 6).forEach((activity, index) => {
      const variant = colorVariants[index % colorVariants.length];

      const item = create(
        "div",
        `
        flex min-h-[4.5rem] items-center rounded-full
        ${variant.bg}
        mb-6 text-accent-yellow shadow-sm
        `
      );

      const room = create(
        "div",
        `
        ${variant.pill}
        flex min-h-[4.4rem] min-w-[7.5rem] items-center justify-center
        rounded-full px-4
        text-2xl font-extrabold
        `
      );
      room.textContent = activity.room;

      const middle = create(
        "div",
        "ml-4 mr-auto flex items-center gap-10"
      );

      const team = create(
        "div",
        "text-3xl font-bold uppercase"
      );
      team.textContent = activity.team;

      const subject = create(
        "div",
        "text-2xl font-semibold opacity-90"
      );
      subject.textContent = activity.subject;

      set([team, subject], middle);

      const time = create(
        "div",
        "mr-6 text-3xl font-bold"
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
      "rounded-3xl bg-primary-red p-10 text-center text-4xl text-white"
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
