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
