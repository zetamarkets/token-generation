## Token generation instructions

### Install dependencies

### Rust

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
rustup component add rustfmt
```

### Solana

```sh
sh -c "$(curl -sSfL https://release.solana.com/v1.7.11/install)"
```

### SPL Token

```sh
cargo install spl-token-cli
```

### Steps

1. Run mint-token.sh
2. Run token-multisig-mint-revoke.ts to generate a encoded transaction.
3. Run the serialized transaction through the multisig.

The resultant token is as seen here:

https://solscan.io/token/ZEXy1pqteRu3n13kdyh4LwPQknkFk3GzmMYMuNadWPo

With no mint authority and supply held by multisig Bs5XaFx9wS8N5ir4QtTb2exhFMKQdZUmjga1peT2DBXt.
