import { ponder } from "@/generated";
import * as schema from "../ponder.schema";
import { notifyServer } from "./notify.js";

// ============================================================================
// IdentityRegistry Event Handlers
// ============================================================================

ponder.on("IdentityRegistry:Registered", async ({ event, context }) => {
  await context.db.insert(schema.chainAgentRegistered).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    agentId: event.args.agentId,
    owner: event.args.owner,
    agentURI: event.args.agentURI,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/agent-registered", {
    agentId: Number(event.args.agentId),
    owner: event.args.owner,
    agentURI: event.args.agentURI,
    txHash: event.log.transactionHash,
  });
});

// ============================================================================
// ReputationRegistry Event Handlers
// ============================================================================

ponder.on("ReputationRegistry:NewFeedback", async ({ event, context }) => {
  await context.db.insert(schema.chainFeedbackGiven).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    agentId: event.args.agentId,
    clientAddress: event.args.clientAddress,
    feedbackIndex: event.args.feedbackIndex,
    value: BigInt(event.args.value),
    valueDecimals: event.args.valueDecimals,
    tag1: event.args.tag1,
    tag2: event.args.tag2,
    endpoint: event.args.endpoint,
    feedbackURI: event.args.feedbackURI,
    feedbackHash: event.args.feedbackHash,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/feedback-submitted", {
    agentId: Number(event.args.agentId),
    clientAddress: event.args.clientAddress,
    feedbackIndex: Number(event.args.feedbackIndex),
    value: Number(event.args.value),
    valueDecimals: event.args.valueDecimals,
    tag1: event.args.tag1,
    tag2: event.args.tag2,
    endpoint: event.args.endpoint,
    txHash: event.log.transactionHash,
  });
});
