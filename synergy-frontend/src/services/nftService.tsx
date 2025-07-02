import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const MODULE_ADDRESS = "0x7d71a1ae719824a70d22beb7deabeb7c0b6223316f27775c2f0f2b94b8e6965f";

const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

export class NFTService {
  private static instance: NFTService;
  private constructor() {}

  public static getInstance(): NFTService {
    if (!NFTService.instance) {
      NFTService.instance = new NFTService();
    }
    return NFTService.instance;
  }

  async getTokenData(tokenId: number) {
    try {
      const response = await aptos.view({
        payload: {
          function: `${MODULE_ADDRESS}::nft_mint::get_token_data`,
          typeArguments: [],
          functionArguments: [tokenId], // Changed from arguments to functionArguments
        },
      });

      return response;
    } catch (error) {
      console.error("Error fetching token data:", error);
      throw error;
    }
  }
}

export default NFTService.getInstance();