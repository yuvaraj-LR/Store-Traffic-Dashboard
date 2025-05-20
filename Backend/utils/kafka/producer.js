import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "store-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateMessage = () => {
  return {
    store_id: 10,
    customers_in: getRandomInt(0, 5),
    customers_out: getRandomInt(0, 5),
    time_stamp: new Date().toISOString(),
  };
};

const produceMessages = async () => {
  await producer.connect();

  setInterval(async () => {
    const message = generateMessage();
    console.log("Producing:", message);

    await producer.send({
      topic: "store-traffic",
      messages: [{ value: JSON.stringify(message) }],
    });
  }, 3000); // every 3 seconds
};

produceMessages().catch(console.error);
