import { EventStoreDBClient, START } from "@eventstore/db-client";

// Create an EventStoreDB client
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

let actualSales = 0;

const subscription = client.subscribeToStream("order-123", { fromRevision: START, })
    .on("data", (resolvedEvent) => {
        handleEvent(resolvedEvent);
    });

console.log("listening for itemShipped events...");

const handleEvent = async (resolvedEvent) => {
    const eventData = resolvedEvent.event?.data;
    if (eventData 
        && resolvedEvent.event?.type === "itemShipped" 
        && eventData.item == "keyboard") {
        console.log("Received event:", eventData);
        actualSales += parseFloat(eventData.amount);
        console.log("the actual sales amount is: " + actualSales);
    }
};
