from brownie import accounts, SimpleNFT


def deploy_simple_nft():
    # acct = accounts.load('sepolia-acct')
    acct = accounts.load('ganache-acct')
    # acct = accounts[0]
    SimpleNFT.deploy("Simple Arts", "SAR", {'from': acct})


def main():
    deploy_simple_nft()
