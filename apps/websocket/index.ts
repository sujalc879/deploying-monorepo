import { db } from "@repo/db/client";

const server = Bun.serve({
    port: 8080,

    fetch(req, server) {
        if (server.upgrade(req)) {
            return;
        }

        return new Response("Upgrade failed", { status: 500 });
    },

    websocket: {
        async message(ws, message) {
            await db.orm.public.User.create({
                email: Math.random() + "2",
                password: Math.random() + "2",
            });

            ws.send(message);
        },
    },
});

console.log(`WebSocket server running at ${server.url}`);