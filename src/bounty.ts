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
    question: event.args.question,
    category: event.args.category,
    difficulty: event.args.difficulty,
    minRating: BigInt(event.args.minRating),
    joinDeadline: BigInt(event.args.joinDeadline),
    maxAgents: event.args.maxAgents,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-update", {
    bountyId: Number(event.args.bountyId),
    phase: "open",
    creator: event.args.creator,
    reward: event.args.reward.toString(),
    question: event.args.question,
    category: event.args.category,
    difficulty: Number(event.args.difficulty),
    minRating: Number(event.args.minRating),
    joinDeadline: new Date(Number(event.args.joinDeadline) * 1000).toISOString(),
    maxAgents: event.args.maxAgents,
  });
});

ponder.on("BountyArena:AgentJoinedBounty", async ({ event, context }) => {
  await context.db.insert(schema.chainAgentJoinedBounty).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    agent: event.args.agent,
    agentId: event.args.agentId,
    agentCount: event.args.agentCount,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-update", {
    bountyId: Number(event.args.bountyId),
    agent: event.args.agent,
    agentId: Number(event.args.agentId),
    agentCount: Number(event.args.agentCount),
  });
});

ponder.on("BountyArena:BountyAnswerPeriodStarted", async ({ event, context }) => {
  await context.db.insert(schema.chainBountyAnswerPeriodStarted).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    startTime: event.args.startTime,
    deadline: event.args.deadline,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-update", {
    bountyId: Number(event.args.bountyId),
    phase: "answer_period",
    answerTimeout: new Date(Number(event.args.deadline) * 1000).toISOString(),
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
    winnerPrize: event.args.winnerPrize,
    treasuryFee: event.args.treasuryFee,
    burnAllocationAmount: event.args.burnAllocationAmount,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-settled", {
    bountyId: Number(event.args.bountyId),
    winnerAddr: event.args.winner,
    prizeMon: event.args.winnerPrize.toString(),
    treasuryFee: event.args.treasuryFee.toString(),
    burnAllocation: event.args.burnAllocationAmount.toString(),
  });
});

ponder.on("BountyArena:BountyExpired", async ({ event, context }) => {
  await context.db.insert(schema.chainBountyExpired).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-settled", {
    bountyId: Number(event.args.bountyId),
    expired: true,
    reason: "no_agents",
  });
});

ponder.on("BountyArena:BountyRefunded", async ({ event, context }) => {
  await context.db.insert(schema.chainBountyRefunded).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    bountyId: event.args.bountyId,
    agentCount: event.args.agentCount,
    refundPerAgent: event.args.refundPerAgent,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  await notifyServer("/internal/bounty-settled", {
    bountyId: Number(event.args.bountyId),
    refunded: true,
    reason: "answer_timeout",
    refundAmount: event.args.refundPerAgent.toString(),
    agentCount: Number(event.args.agentCount),
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
