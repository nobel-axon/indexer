import { onchainTable, index } from "@ponder/core";

// ============================================================================
// AxonArena Events
// ============================================================================

export const chainMatchCreated = onchainTable(
  "chain_match_created",
  (t) => ({
    id: t.text().primaryKey(),
    matchId: t.bigint().notNull(),
    entryFee: t.bigint().notNull(),
    baseAnswerFee: t.bigint().notNull(),
    queueDeadline: t.bigint().notNull(),
    minPlayers: t.integer().notNull(),
    maxPlayers: t.integer().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    matchIdIdx: index().on(table.matchId),
    blockTimestampIdx: index().on(table.blockTimestamp),
  })
);

export const chainAgentJoinedQueue = onchainTable(
  "chain_agent_joined_queue",
  (t) => ({
    id: t.text().primaryKey(),
    matchId: t.bigint().notNull(),
    agent: t.text().notNull(),
    playerCount: t.bigint().notNull(),
    poolTotal: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    matchIdIdx: index().on(table.matchId),
    agentIdx: index().on(table.agent),
  })
);

export const chainMatchStarted = onchainTable(
  "chain_match_started",
  (t) => ({
    id: t.text().primaryKey(),
    matchId: t.bigint().notNull(),
    playerCount: t.bigint().notNull(),
    pool: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    matchIdIdx: index().on(table.matchId),
  })
);

export const chainQuestionRevealed = onchainTable(
  "chain_question_revealed",
  (t) => ({
    id: t.text().primaryKey(),
    matchId: t.bigint().notNull(),
    question: t.text().notNull(),
    category: t.text().notNull(),
    difficulty: t.integer().notNull(),
    formatHint: t.text().notNull(),
    answerHash: t.text().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    matchIdIdx: index().on(table.matchId),
    categoryIdx: index().on(table.category),
  })
);

export const chainAnswerPeriodStarted = onchainTable(
  "chain_answer_period_started",
  (t) => ({
    id: t.text().primaryKey(),
    matchId: t.bigint().notNull(),
    startTime: t.bigint().notNull(),
    deadline: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    matchIdIdx: index().on(table.matchId),
  })
);

export const chainAnswerSubmitted = onchainTable(
  "chain_answer_submitted",
  (t) => ({
    id: t.text().primaryKey(),
    matchId: t.bigint().notNull(),
    agent: t.text().notNull(),
    answer: t.text().notNull(),
    attemptNumber: t.bigint().notNull(),
    neuronBurned: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    matchIdIdx: index().on(table.matchId),
    agentIdx: index().on(table.agent),
    matchAgentIdx: index().on(table.matchId, table.agent),
  })
);

export const chainMatchSettled = onchainTable(
  "chain_match_settled",
  (t) => ({
    id: t.text().primaryKey(),
    matchId: t.bigint().notNull(),
    winner: t.text().notNull(),
    winnerPrize: t.bigint().notNull(),
    treasuryFee: t.bigint().notNull(),
    burnAllocationAmount: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    matchIdIdx: index().on(table.matchId),
    winnerIdx: index().on(table.winner),
  })
);

export const chainAnswerRevealed = onchainTable(
  "chain_answer_revealed",
  (t) => ({
    id: t.text().primaryKey(),
    matchId: t.bigint().notNull(),
    answer: t.text().notNull(),
    salt: t.text().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    matchIdIdx: index().on(table.matchId),
  })
);

export const chainMatchRefunded = onchainTable(
  "chain_match_refunded",
  (t) => ({
    id: t.text().primaryKey(),
    matchId: t.bigint().notNull(),
    playerCount: t.bigint().notNull(),
    refundPerPlayer: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    matchIdIdx: index().on(table.matchId),
  })
);

export const chainMatchCancelled = onchainTable(
  "chain_match_cancelled",
  (t) => ({
    id: t.text().primaryKey(),
    matchId: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    matchIdIdx: index().on(table.matchId),
  })
);

export const chainNeuronBurned = onchainTable(
  "chain_neuron_burned",
  (t) => ({
    id: t.text().primaryKey(),
    matchId: t.bigint().notNull(),
    agent: t.text().notNull(),
    amount: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    matchIdIdx: index().on(table.matchId),
    agentIdx: index().on(table.agent),
  })
);

// ============================================================================
// NeuronToken Events (Transfer to 0x0 = burn)
// ============================================================================

export const chainNeuronTransfer = onchainTable(
  "chain_neuron_transfer",
  (t) => ({
    id: t.text().primaryKey(),
    from: t.text().notNull(),
    to: t.text().notNull(),
    value: t.bigint().notNull(),
    isBurn: t.boolean().notNull(), // true if to === 0x0
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    fromIdx: index().on(table.from),
    toIdx: index().on(table.to),
    isBurnIdx: index().on(table.isBurn),
  })
);
