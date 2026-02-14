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

export const chainBurnAllocationClaimed = onchainTable(
  "chain_burn_allocation_claimed",
  (t) => ({
    id: t.text().primaryKey(),
    operator: t.text().notNull(),
    winner: t.text().notNull(),
    amount: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    winnerIdx: index().on(table.winner),
    operatorIdx: index().on(table.operator),
  })
);

export const chainRefundCredited = onchainTable(
  "chain_refund_credited",
  (t) => ({
    id: t.text().primaryKey(),
    matchId: t.bigint().notNull(),
    player: t.text().notNull(),
    amount: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    matchIdIdx: index().on(table.matchId),
    playerIdx: index().on(table.player),
  })
);

export const chainRefundWithdrawn = onchainTable(
  "chain_refund_withdrawn",
  (t) => ({
    id: t.text().primaryKey(),
    player: t.text().notNull(),
    amount: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    playerIdx: index().on(table.player),
  })
);

// ============================================================================
// BountyArena Events
// ============================================================================

export const chainBountyCreated = onchainTable(
  "chain_bounty_created",
  (t) => ({
    id: t.text().primaryKey(),
    bountyId: t.bigint().notNull(),
    creator: t.text().notNull(),
    reward: t.bigint().notNull(),
    baseAnswerFee: t.bigint().notNull(),
    question: t.text().notNull(),
    category: t.text().notNull(),
    difficulty: t.integer().notNull(),
    minRating: t.bigint().notNull(),
    deadline: t.bigint().notNull(),
    maxAgents: t.integer().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    bountyIdIdx: index().on(table.bountyId),
    creatorIdx: index().on(table.creator),
    categoryIdx: index().on(table.category),
    blockTimestampIdx: index().on(table.blockTimestamp),
  })
);

export const chainAgentJoinedBounty = onchainTable(
  "chain_agent_joined_bounty",
  (t) => ({
    id: t.text().primaryKey(),
    bountyId: t.bigint().notNull(),
    agent: t.text().notNull(),
    agentId: t.bigint().notNull(),
    agentCount: t.bigint().notNull(),
    snapshotReputation: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    bountyIdIdx: index().on(table.bountyId),
    agentIdx: index().on(table.agent),
  })
);

export const chainBountyAnswerSubmitted = onchainTable(
  "chain_bounty_answer_submitted",
  (t) => ({
    id: t.text().primaryKey(),
    bountyId: t.bigint().notNull(),
    agent: t.text().notNull(),
    answer: t.text().notNull(),
    attemptNumber: t.bigint().notNull(),
    neuronBurned: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    bountyIdIdx: index().on(table.bountyId),
    agentIdx: index().on(table.agent),
    bountyAgentIdx: index().on(table.bountyId, table.agent),
  })
);

export const chainBountySettled = onchainTable(
  "chain_bounty_settled",
  (t) => ({
    id: t.text().primaryKey(),
    bountyId: t.bigint().notNull(),
    winner: t.text().notNull(),
    reward: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    bountyIdIdx: index().on(table.bountyId),
    winnerIdx: index().on(table.winner),
  })
);

export const chainWinnerRewardClaimed = onchainTable(
  "chain_winner_reward_claimed",
  (t) => ({
    id: t.text().primaryKey(),
    bountyId: t.bigint().notNull(),
    winner: t.text().notNull(),
    amount: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    bountyIdIdx: index().on(table.bountyId),
    winnerIdx: index().on(table.winner),
  })
);

export const chainProportionalClaimed = onchainTable(
  "chain_proportional_claimed",
  (t) => ({
    id: t.text().primaryKey(),
    bountyId: t.bigint().notNull(),
    agent: t.text().notNull(),
    amount: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    bountyIdIdx: index().on(table.bountyId),
    agentIdx: index().on(table.agent),
  })
);

export const chainRefundClaimed = onchainTable(
  "chain_refund_claimed",
  (t) => ({
    id: t.text().primaryKey(),
    bountyId: t.bigint().notNull(),
    creator: t.text().notNull(),
    amount: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    bountyIdIdx: index().on(table.bountyId),
    creatorIdx: index().on(table.creator),
  })
);

export const chainBountyApproved = onchainTable(
  "chain_bounty_approved",
  (t) => ({
    id: t.text().primaryKey(),
    bountyId: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    bountyIdIdx: index().on(table.bountyId),
  })
);

export const chainBountyRejected = onchainTable(
  "chain_bounty_rejected",
  (t) => ({
    id: t.text().primaryKey(),
    bountyId: t.bigint().notNull(),
    reason: t.text().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    bountyIdIdx: index().on(table.bountyId),
  })
);

export const chainBountyNeuronBurned = onchainTable(
  "chain_bounty_neuron_burned",
  (t) => ({
    id: t.text().primaryKey(),
    bountyId: t.bigint().notNull(),
    agent: t.text().notNull(),
    amount: t.bigint().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    bountyIdIdx: index().on(table.bountyId),
    agentIdx: index().on(table.agent),
  })
);

// ============================================================================
// ERC-8004 Identity & Reputation Events
// ============================================================================

export const chainAgentRegistered = onchainTable(
  "chain_agent_registered",
  (t) => ({
    id: t.text().primaryKey(),
    agentId: t.bigint().notNull(),
    owner: t.text().notNull(),
    agentURI: t.text().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    agentIdIdx: index().on(table.agentId),
    ownerIdx: index().on(table.owner),
  })
);

export const chainFeedbackGiven = onchainTable(
  "chain_feedback_given",
  (t) => ({
    id: t.text().primaryKey(),
    agentId: t.bigint().notNull(),
    clientAddress: t.text().notNull(),
    feedbackIndex: t.bigint().notNull(),
    value: t.bigint().notNull(),
    valueDecimals: t.integer().notNull(),
    tag1: t.text().notNull(),
    tag2: t.text().notNull(),
    endpoint: t.text().notNull(),
    feedbackURI: t.text().notNull(),
    feedbackHash: t.text().notNull(),
    blockNumber: t.bigint().notNull(),
    blockTimestamp: t.bigint().notNull(),
    transactionHash: t.text().notNull(),
  }),
  (table) => ({
    agentIdIdx: index().on(table.agentId),
    clientAddressIdx: index().on(table.clientAddress),
    tag1Idx: index().on(table.tag1),
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
