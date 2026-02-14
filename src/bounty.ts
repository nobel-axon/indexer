import { ponder } from "@/generated";
import * as schema from "../ponder.schema";
import { notifyServer } from "./notify.js";

// ============================================================================
// BountyArena Event Handlers
// ============================================================================

ponder.on("BountyArena:BountyCreated", async ({ event, context }) => {
  await context.db.insert(schema.chainBountyCreated).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    creator: event.args.creator,
    reward: event.args.reward,
    baseAnswerFee: event.args.baseAnswerFee,
    question: event.args.question,
    category: event.args.category,
    difficulty: event.args.difficulty,
    minRating: BigInt(event.args.minRating),
    deadline: BigInt(event.args.deadline),
    maxAgents: event.args.maxAgents,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-update", {
    bountyId: Number(event.args.bountyId),
    phase: "pending",
    creator: event.args.creator,
    reward: event.args.reward.toString(),
    baseAnswerFee: event.args.baseAnswerFee.toString(),
    question: event.args.question,
    category: event.args.category,
    difficulty: Number(event.args.difficulty),
    minRating: event.args.minRating.toString(),
    deadline: new Date(Number(event.args.deadline) * 1000).toISOString(),
    maxAgents: event.args.maxAgents,
  });
});

ponder.on("BountyArena:BountyApproved", async ({ event, context }) => {
  await context.db.insert(schema.chainBountyApproved).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-update", {
    bountyId: Number(event.args.bountyId),
    phase: "active",
  });
});

ponder.on("BountyArena:BountyRejected", async ({ event, context }) => {
  await context.db.insert(schema.chainBountyRejected).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    reason: event.args.reason,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-update", {
    bountyId: Number(event.args.bountyId),
    phase: "rejected",
    rejectionReason: event.args.reason,
  });
});

ponder.on("BountyArena:AgentJoinedBounty", async ({ event, context }) => {
  await context.db.insert(schema.chainAgentJoinedBounty).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    agent: event.args.agent,
    agentId: event.args.agentId,
    agentCount: event.args.agentCount,
    snapshotReputation: BigInt(event.args.snapshotReputation),
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-update", {
    bountyId: Number(event.args.bountyId),
    agent: event.args.agent,
    agentId: Number(event.args.agentId),
    agentCount: Number(event.args.agentCount),
    snapshotReputation: event.args.snapshotReputation.toString(),
  });
});

ponder.on("BountyArena:BountyAnswerSubmitted", async ({ event, context }) => {
  await context.db.insert(schema.chainBountyAnswerSubmitted).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    agent: event.args.agent,
    answer: event.args.answer,
    attemptNumber: event.args.attemptNumber,
    neuronBurned: event.args.neuronBurned,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-answer-submitted", {
    bountyId: Number(event.args.bountyId),
    agent: event.args.agent,
    answer: event.args.answer,
    attemptNumber: Number(event.args.attemptNumber),
    neuronBurned: event.args.neuronBurned.toString(),
    txHash: event.log.transactionHash,
    logIndex: event.log.logIndex,
  });
});

ponder.on("BountyArena:BountySettled", async ({ event, context }) => {
  await context.db.insert(schema.chainBountySettled).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    winner: event.args.winner,
    reward: event.args.reward,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-settled", {
    bountyId: Number(event.args.bountyId),
    winnerAddr: event.args.winner,
    reward: event.args.reward.toString(),
    settleTxHash: event.log.transactionHash,
  });
});

ponder.on("BountyArena:WinnerRewardClaimed", async ({ event, context }) => {
  await context.db.insert(schema.chainWinnerRewardClaimed).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    winner: event.args.winner,
    amount: event.args.amount,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-claim", {
    bountyId: Number(event.args.bountyId),
    type: "winner_reward_claimed",
    winner: event.args.winner,
    amount: event.args.amount.toString(),
  });
});

ponder.on("BountyArena:ProportionalClaimed", async ({ event, context }) => {
  await context.db.insert(schema.chainProportionalClaimed).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    agent: event.args.agent,
    amount: event.args.amount,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-claim", {
    bountyId: Number(event.args.bountyId),
    type: "proportional_claimed",
    agent: event.args.agent,
    amount: event.args.amount.toString(),
  });
});

ponder.on("BountyArena:RefundClaimed", async ({ event, context }) => {
  await context.db.insert(schema.chainRefundClaimed).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    creator: event.args.creator,
    amount: event.args.amount,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-claim", {
    bountyId: Number(event.args.bountyId),
    type: "refund_claimed",
    creator: event.args.creator,
    amount: event.args.amount.toString(),
  });
});

ponder.on("BountyArena:BountyNeuronBurned", async ({ event, context }) => {
  await context.db.insert(schema.chainBountyNeuronBurned).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    agent: event.args.agent,
    amount: event.args.amount,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });
});
