import { createConfig } from "@ponder/core";
import { createPublicClient, http } from "viem";

import AxonArenaArtifact from "./abi/AxonArena.json";
import BountyArenaArtifact from "./abi/BountyArena.json";
import IIdentityRegistryAbi from "./abi/IIdentityRegistry.json";
import IReputationRegistryAbi from "./abi/IReputationRegistry.json";
import INeuronTokenAbi from "./abi/INeuronToken.json";

const AxonArenaAbi = (AxonArenaArtifact as any).abi ?? AxonArenaArtifact;
const BountyArenaAbi = (BountyArenaArtifact as any).abi ?? BountyArenaArtifact;
const IdentityRegistryAbi = (IIdentityRegistryAbi as any).abi ?? IIdentityRegistryAbi;
const ReputationRegistryAbi = (IReputationRegistryAbi as any).abi ?? IReputationRegistryAbi;

async function getStartBlock(envVar: string): Promise<number> {
  const val = process.env[envVar];
  if (val && Number(val) > 0) return Number(val);

  const rpcUrl =
    process.env.PONDER_RPC_URL_143 || "https://rpc.monad.xyz";
  const client = createPublicClient({ transport: http(rpcUrl) });
  const block = await client.getBlockNumber();
  console.log(`${envVar} not set, using latest block: ${block}`);
  return Number(block);
}

const arenaStartBlock = await getStartBlock("AXON_ARENA_START_BLOCK");
const bountyStartBlock = await getStartBlock("BOUNTY_ARENA_START_BLOCK");
const identityStartBlock = await getStartBlock("IDENTITY_REGISTRY_START_BLOCK");
const reputationStartBlock = await getStartBlock("REPUTATION_REGISTRY_START_BLOCK");
const neuronStartBlock = await getStartBlock("NEURON_TOKEN_START_BLOCK");

export default createConfig({
  networks: {
    // monadTestnet: {
    //   chainId: 10143,
    //   transport: http(process.env.PONDER_RPC_URL_10143),
    // },
    monadMainnet: {
      chainId: 143,
      transport: http(process.env.PONDER_RPC_URL_143),
    },
  },
  contracts: {
    AxonArena: {
      network: {
        // monadTestnet: {
        //   address: process.env.AXON_ARENA_ADDRESS as `0x${string}`,
        //   startBlock: arenaStartBlock,
        // },
        monadMainnet: {
          address: process.env.AXON_ARENA_ADDRESS as `0x${string}`,
          startBlock: arenaStartBlock,
        },
      },
      abi: AxonArenaAbi,
    },
    BountyArena: {
      network: {
        monadMainnet: {
          address: process.env.BOUNTY_ARENA_ADDRESS as `0x${string}`,
          startBlock: bountyStartBlock,
        },
      },
      abi: BountyArenaAbi,
    },
    IdentityRegistry: {
      network: {
        monadMainnet: {
          address: process.env.IDENTITY_REGISTRY_ADDRESS as `0x${string}`,
          startBlock: identityStartBlock,
        },
      },
      abi: IdentityRegistryAbi,
    },
    ReputationRegistry: {
      network: {
        monadMainnet: {
          address: process.env.REPUTATION_REGISTRY_ADDRESS as `0x${string}`,
          startBlock: reputationStartBlock,
        },
      },
      abi: ReputationRegistryAbi,
    },
    NeuronToken: {
      network: {
        // monadTestnet: {
        //   address: process.env.NEURON_TOKEN_ADDRESS as `0x${string}`,
        //   startBlock: neuronStartBlock,
        // },
        monadMainnet: {
          address: process.env.NEURON_TOKEN_ADDRESS as `0x${string}`,
          startBlock: neuronStartBlock,
        },
      },
      abi: INeuronTokenAbi,
    },
  },
  database: process.env.DATABASE_URL
    ? {
        kind: "postgres",
        connectionString: process.env.DATABASE_URL,
      }
    : {
        kind: "pglite",
      },
});
