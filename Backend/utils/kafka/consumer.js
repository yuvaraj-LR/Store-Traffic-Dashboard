import { Kafka } from "kafkajs";
import { addToHistory } from "../Store/HistoryStore.js";

const kafka = new Kafka({
  clientId: "store-consumer",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "store-group" });

let socketRef = null;

async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: "store-traffic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log("Received from Kafka:", data);

      // Emit to socket if available
      if (socketRef) {
        socketRef.emit("store-update", data);
      }

      addToHistory(data);
    },
  });
}

export function attachSocket(socket) {
  socketRef = socket;
}

export default startConsumer;
