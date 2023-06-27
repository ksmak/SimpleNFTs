from brownie import accounts, SimpleNFT


def deploy_simple_nft():
    acct = accounts.load('my-account')
    # acct = accounts[0]
    SimpleNFT.deploy("My NFT Token", "NFT", {'from': acct})


def main():
    deploy_simple_nft()
