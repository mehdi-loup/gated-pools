# Makefile

ifneq (,$(wildcard ./.env))
    include .env
    export $(shell sed 's/=.*//' .env)
endif

CONTRACTS_DIR = ./out
CONTRACTS = EmailDomainDAOProver EmailDomainDAOVerifier
FRONTEND_ABI_DIR = ../frontend/hooks/vlayer/abis

.DEFAULT_GOAL := help

# 3) Foundry commands
build: ## Build the contracts
	@forge build

tests: ## Run tests
	@forge test --gas-report

coverage: ## Run coverage
	@forge coverage

clean: ## Remove artifacts (build cache, etc.)
	@rm -rf out
	@rm -rf cache

copy: build
	@echo "Copying ABI..."
	@for contract in $(CONTRACTS); do \
    	cp $(CONTRACTS_DIR)/$$contract.sol/$$contract.json $(FRONTEND_ABI_DIR); \
	done
	@echo "ABI files copied successfully!"

deploy: ## Deploy contract(s) to the specified network
	@forge script script/Deploy.s.sol \
		--rpc-url $(RPC_URL) \
		--private-key $(PRIVATE_KEY) \
		--broadcast

mint-dao: ## Mint DAO tokens (usage: make mint-dao RECIPIENT=0x...)
	@cast send --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) \
		$(DAO_TOKEN_ADDRESS) "mint(address)" $(RECIPIENT)
	@echo "Minted DAO tokens to $(RECIPIENT)"

mint-usdc: ## Mint USDC tokens (usage: make mint-usdc RECIPIENT=0x...)
	@cast send --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) \
		$(USDC_TOKEN_ADDRESS) "mint(address)" $(RECIPIENT)
	@echo "Minted USDC tokens to $(RECIPIENT)"

mint-all: ## Mint both DAO and USDC tokens (usage: make mint-all RECIPIENT=0x...)
	@make mint-dao RECIPIENT=$(RECIPIENT)
	@make mint-usdc RECIPIENT=$(RECIPIENT)

balance-dao: ## Check DAO token balance (usage: make balance-dao ADDRESS=0x...)
	@echo "Checking DAO token balance for $(ADDRESS)..."
	@cast call --rpc-url $(RPC_URL) $(DAO_TOKEN_ADDRESS) "balanceOf(address)(uint256)" $(ADDRESS)

balance-usdc: ## Check USDC token balance (usage: make balance-usdc ADDRESS=0x...)
	@echo "Checking USDC token balance for $(ADDRESS)..."
	@cast call --rpc-url $(RPC_URL) $(USDC_TOKEN_ADDRESS) "balanceOf(address)(uint256)" $(ADDRESS)

balance-all: ## Check both token balances (usage: make balance-all ADDRESS=0x...)
	@make balance-dao ADDRESS=$(ADDRESS)
	@make balance-usdc ADDRESS=$(ADDRESS)

has-minted-dao: ## Check if address has minted DAO tokens (usage: make has-minted-dao ADDRESS=0x...)
	@echo "Checking if $(ADDRESS) has minted DAO tokens..."
	@cast call --rpc-url $(RPC_URL) $(DAO_TOKEN_ADDRESS) "hasMinted(address)(bool)" $(ADDRESS)

has-minted-usdc: ## Check if address has minted USDC tokens (usage: make has-minted-usdc ADDRESS=0x...)
	@echo "Checking if $(ADDRESS) has minted USDC tokens..."
	@cast call --rpc-url $(RPC_URL) $(USDC_TOKEN_ADDRESS) "hasMinted(address)(bool)" $(ADDRESS)

has-minted-all: ## Check if address has minted both tokens (usage: make has-minted-all ADDRESS=0x...)
	@make has-minted-dao ADDRESS=$(ADDRESS)
	@make has-minted-usdc ADDRESS=$(ADDRESS)



help: ## Show available Make targets
	@echo "Usage: make [target] RECIPIENT=0x... or ADDRESS=0x... (e.g., make mint-dao RECIPIENT=0x123...)"
	@echo ""
	@echo "Available tokens:"
	@echo "  DAO: $(DAO_TOKEN_ADDRESS)"
	@echo "  USDC: $(USDC_TOKEN_ADDRESS)"
	@echo ""
	@echo "Balance commands:"
	@echo "  make balance-dao ADDRESS=0x123..."
	@echo "  make balance-usdc ADDRESS=0x123..."
	@echo "  make balance-all ADDRESS=0x123..."
	@echo ""
	@echo "Minting status commands:"
	@echo "  make has-minted-dao ADDRESS=0x123..."
	@echo "  make has-minted-usdc ADDRESS=0x123..."
	@echo "  make has-minted-all ADDRESS=0x123..."
	@echo ""
	@echo "Targets:"
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z0-9\-_]+:.*?##/ \
		{ printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
