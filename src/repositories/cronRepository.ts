import db from "../app.js";

async function getLastTime() {
  const time = await db
    .collection("cron_history")
    .find({})
    .sort({ time: -1 })
    .limit(1)
    .toArray();
  return time[0].time;
}

const cronRepository = {
  getLastTime,
};

export default cronRepository;
