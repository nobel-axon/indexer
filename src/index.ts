import { ponder } from "@/generated";
import * as schema from "../ponder.schema";
import { notifyServer } from "./notify.js";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

// ============================================================================
// AxonArena Event Handlers
// ============================================================================

ponder.on("AxonArena:MatchCreated", async ({ event, context }) => {
  await context.db.insert(schema.chainMatchCreated).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    matchId: event.args.matchId,
    entryFee: event.args.entryFee,
    baseAnswerFee: event.args.baseAnswerFee,
    queueDeadline: BigInt(event.args.queueDeadline),
    minPlayers: event.args.minPlayers,
    maxPlayers: event.args.maxPlayers,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  // Notify axon-server of match creation
  await notifyServer("/internal/match-update", {
    matchId: Number(event.args.matchId),
    phase: "registration",
    entryFee: event.args.entryFee.toString(),
    answerFee: event.args.baseAnswerFee.toString(),
    registrationEnd: new Date(Number(event.args.queueDeadline) * 1000).toISOString(),
    minPlayers: event.args.minPlayers,
    maxPlayers: event.args.maxPlayers,
  });
});

ponder.on("AxonArena:AgentJoinedQueue", async ({ event, context }) => {
  await context.db.insert(schema.chainAgentJoinedQueue).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    matchId: event.args.matchId,
    agent: event.args.agent,
    playerCount: event.args.playerCount,
    poolTotal: event.args.poolTotal,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  // Notify axon-server of player join
  await notifyServer("/internal/match-update", {
    matchId: Number(event.args.matchId),
    playerCount: Number(event.args.playerCount),
    poolTotal: event.args.poolTotal.toString(),
    agent: event.args.agent,
  });
});

ponder.on("AxonArena:MatchStarted", async ({ event, context }) => {
  await context.db.insert(schema.chainMatchStarted).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    matchId: event.args.matchId,
    playerCount: event.args.playerCount,
    pool: event.args.pool,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  // Notify axon-server that match started (waiting for question)
  await notifyServer("/internal/match-update", {
    matchId: Number(event.args.matchId),
    phase: "started",
    playerCount: Number(event.args.playerCount),
    poolTotal: event.args.pool.toString(),
  });
});

ponder.on("AxonArena:QuestionRevealed", async ({ event, context }) => {
  await context.db.insert(schema.chainQuestionRevealed).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    matchId: event.args.matchId,
    question: event.args.question,
    category: event.args.category,
    difficulty: event.args.difficulty,
    formatHint: event.args.formatHint,
    answerHash: event.args.answerHash,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  // Notify axon-server of question reveal
  await notifyServer("/internal/match-update", {
    matchId: Number(event.args.matchId),
    phase: "question_live",
    questionText: event.args.question,
    category: event.args.category,
    difficulty: Number(event.args.difficulty),
    formatHint: event.args.formatHint,
    answerHash: event.args.answerHash,
  });
});

ponder.on("AxonArena:AnswerPeriodStarted", async ({ event, context }) => {
  await context.db.insert(schema.chainAnswerPeriodStarted).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    matchId: event.args.matchId,
    startTime: event.args.startTime,
    deadline: event.args.deadline,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  // Notify axon-server of answer period start
  await notifyServer("/internal/match-update", {
    matchId: Number(event.args.matchId),
    phase: "answer_period",
    answerTimeout: new Date(Number(event.args.deadline) * 1000).toISOString(),
  });
});

ponder.on("AxonArena:AnswerSubmitted", async ({ event, context }) => {
  await context.db.insert(schema.chainAnswerSubmitted).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    matchId: event.args.matchId,
    agent: event.args.agent,
    answer: event.args.answer,
    attemptNumber: event.args.attemptNumber,
    neuronBurned: event.args.neuronBurned,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  // Notify axon-server of answer submission
  await notifyServer("/internal/answer-submitted", {
    matchId: Number(event.args.matchId),
    agent: event.args.agent,
    answer: event.args.answer,
    attemptNumber: Number(event.args.attemptNumber),
    neuronBurned: event.args.neuronBurned.toString(),
    txHash: event.log.transactionHash,
    logIndex: event.log.logIndex,
  });
});

ponder.on("AxonArena:MatchSettled", async ({ event, context }) => {
  await context.db.insert(schema.chainMatchSettled).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    matchId: event.args.matchId,
    winner: event.args.winner,
    winnerPrize: event.args.winnerPrize,
    treasuryFee: event.args.treasuryFee,
    burnAllocationAmount: event.args.burnAllocationAmount,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  // Notify axon-server of match settlement
  await notifyServer("/internal/match-settled", {
    matchId: Number(event.args.matchId),
    winnerAddr: event.args.winner,
    prizeMon: event.args.winnerPrize.toString(),
    treasuryFee: event.args.treasuryFee.toString(),
    burnAllocation: event.args.burnAllocationAmount.toString(),
    isCancelled: false,
  });
});

ponder.on("AxonArena:AnswerRevealed", async ({ event, context }) => {
  await context.db.insert(schema.chainAnswerRevealed).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    matchId: event.args.matchId,
    answer: event.args.answer,
    salt: event.args.salt,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  // Notify axon-server of answer reveal
  await notifyServer("/internal/answer-revealed", {
    matchId: Number(event.args.matchId),
    answer: event.args.answer,
    salt: event.args.salt,
  });
});

ponder.on("AxonArena:MatchRefunded", async ({ event, context }) => {
  await context.db.insert(schema.chainMatchRefunded).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    matchId: event.args.matchId,
    playerCount: event.args.playerCount,
    refundPerPlayer: event.args.refundPerPlayer,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  // Notify axon-server of match refund
  await notifyServer("/internal/match-settled", {
    matchId: Number(event.args.matchId),
    isCancelled: true,
    reason: "refunded",
    refundPerPlayer: event.args.refundPerPlayer.toString(),
    playerCount: Number(event.args.playerCount),
  });
});

ponder.on("AxonArena:MatchCancelled", async ({ event, context }) => {
  await context.db.insert(schema.chainMatchCancelled).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    matchId: event.args.matchId,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });

  // Notify axon-server of match cancellation
  await notifyServer("/internal/match-settled", {
    matchId: Number(event.args.matchId),
    isCancelled: true,
    reason: "cancelled",
  });
});

ponder.on("AxonArena:NeuronBurned", async ({ event, context }) => {
  await context.db.insert(schema.chainNeuronBurned).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    matchId: event.args.matchId,
    agent: event.args.agent,
    amount: event.args.amount,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });
});

// ============================================================================
// NeuronToken Event Handlers
// ============================================================================

ponder.on("NeuronToken:Transfer", async ({ event, context }) => {
  const isBurn = event.args.to.toLowerCase() === ZERO_ADDRESS;

  await context.db.insert(schema.chainNeuronTransfer).values({
    id: `${event.log.transactionHash}-${event.log.logIndex}`,
    from: event.args.from,
    to: event.args.to,
    value: event.args.value,
    isBurn,
    blockNumber: event.block.number,
    blockTimestamp: event.block.timestamp,
    transactionHash: event.log.transactionHash,
  });
});
