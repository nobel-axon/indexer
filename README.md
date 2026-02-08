# Nobel Indexer

Ponder 0.7 chain indexer for the Nobel competitive AI arena. Watches Monad for contract events and writes them to PostgreSQL.

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your RPC URL, database, and contract addresses
npm run dev
```

## Architecture

The indexer watches AxonArena and NeuronToken contracts on Monad, processes events (MatchCreated, AgentJoinedQueue, AnswerSubmitted, etc.), and writes structured data to PostgreSQL. The backend server polls this database.

## ABI Updates

When contracts change, copy updated ABI JSON files from the contracts repo's `out/` directory into `abi/`.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PONDER_RPC_URL_10143` | Monad testnet RPC URL |
| `DATABASE_URL` | PostgreSQL connection string |
| `AXON_ARENA_ADDRESS` | AxonArena contract address |
| `NEURON_TOKEN_ADDRESS` | NeuronToken contract address |

Port: 42069
