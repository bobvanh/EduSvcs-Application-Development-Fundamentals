import { EventStoreDBClient, jsonEvent} from "@eventstore/db-client";
import { v4 as uuid} from 'uuid';

const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");

const event1 = jsonEvent({
    id: uuid(),
    type: "itemShipped",
    data: {
      customerId: "1",
      amount: "50.00",
      item: "keyboard"
    }
  });

  await client.appendToStream("order-123", event1);

client.dispose();
console.log("Events were added");