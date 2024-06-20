import { Transaction, Connection, PublicKey } from "@solana/web3.js";
import {
  createMintToInstruction,
  createSetAuthorityInstruction,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  AuthorityType,
} from "@solana/spl-token";
import * as bs58 from "bs58";

const url = "https://api.mainnet-beta.solana.com";

/*
 * 1 Create ATA for multisig
 * 2. Mint 1B Token
 * 3. Revoke authority
 */

let tokenAddress = new PublicKey("ZEXy1pqteRu3n13kdyh4LwPQknkFk3GzmMYMuNadWPo"); // Multisig
let multisigAddress = new PublicKey(
  "Bs5XaFx9wS8N5ir4QtTb2exhFMKQdZUmjga1peT2DBXt"
);

async function main() {
  let connection = new Connection(url, "processed");

  let tokenAccountAddress = await getAssociatedTokenAddress(
    tokenAddress,
    multisigAddress,
    true
  );

  let mintTx = new Transaction();
  mintTx.add(
    createAssociatedTokenAccountInstruction(
      multisigAddress,
      tokenAccountAddress,
      multisigAddress,
      tokenAddress
    )
  );
  mintTx.add(
    createMintToInstruction(
      tokenAddress,
      tokenAccountAddress,
      multisigAddress,
      1_000_000_000_000_000
    )
  );

  mintTx.add(
    createSetAuthorityInstruction(
      tokenAddress,
      multisigAddress,
      AuthorityType.MintTokens,
      null
    )
  );

  const blockhash = await connection.getRecentBlockhash("processed");

  // This isn't used, just required for serialization.
  mintTx.recentBlockhash = blockhash.blockhash;
  mintTx.feePayer = multisigAddress;

  const rawTx = mintTx.serializeMessage();
  let mintTxString = bs58.encode(rawTx);
  console.log(`MintTX: ${mintTxString}`);
}

main();
