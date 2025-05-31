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


help: ## Show available Make targets
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z0-9\-_]+:.*?##/ \
		{ printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
