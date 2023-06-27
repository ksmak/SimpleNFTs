import pytest

from brownie import accounts, SimpleNFT


@pytest.fixture
def token():
    return accounts[0].deploy(SimpleNFT, "MyNFT Marketplace", "MFT")


def test_nft_operations(token):
    # accounts[0] - contract owner
    # accounts[1] - seller
    # accounts[2] - buyer

    token.createArt('xxx', '4 ether', 'my art',
                    'my art desc', {'from': accounts[1]})

    arts = token.getAllArts()
    assert arts[0][0] == 0
    assert arts[0][1] == 0
    assert arts[0][2] == 'xxx'
    assert arts[0][3] == accounts[1]
    assert arts[0][4] == accounts[1]
    assert arts[0][5] == '4 ether'
    assert arts[0][6] == 'my art'
    assert arts[0][7] == 'my art desc'
    assert arts[0][8] != 0
    assert arts[0][9] == 0

    token.sendMoney({'from': accounts[2], 'value': '5 ether'})
    assert token.getBalance() == '5 ether'
    assert token.getBalances(accounts[2]) == '5 ether'

    token.buyArt(accounts[2], 0, '1 ether', {'from': accounts[0]})

    arts = token.getAllArts()
    assert arts[0][0] == 0
    assert arts[0][1] == 1
    assert arts[0][2] == 'xxx'
    assert arts[0][3] == accounts[1]
    assert arts[0][4] == accounts[2]
    assert arts[0][5] == '4 ether'
    assert arts[0][6] == 'my art'
    assert arts[0][7] == 'my art desc'
    assert arts[0][8] != 0
    assert arts[0][9] != 0

    token.resaleArt(0, '5 ether', {'from': accounts[2]})

    arts = token.getAllArts()
    assert arts[0][0] == 0
    assert arts[0][1] == 0
    assert arts[0][2] == 'xxx'
    assert arts[0][3] == accounts[1]
    assert arts[0][4] == accounts[2]
    assert arts[0][5] == '5 ether'
    assert arts[0][6] == 'my art'
    assert arts[0][7] == 'my art desc'
    assert arts[0][8] != 0
    assert arts[0][9] != 0

    token.cancelArt(0, {'from': accounts[2]})

    arts = token.getAllArts()
    assert arts[0][0] == 0
    assert arts[0][1] == 1
    assert arts[0][2] == 'xxx'
    assert arts[0][3] == accounts[1]
    assert arts[0][4] == accounts[2]
    assert arts[0][5] == '5 ether'
    assert arts[0][6] == 'my art'
    assert arts[0][7] == 'my art desc'
    assert arts[0][8] != 0
    assert arts[0][9] != 0

    token.removeArt(0, {'from': accounts[2]})

    arts = token.getAllArts()
    assert arts[0][0] == 0
    assert arts[0][1] == 1
    assert arts[0][2] == 'xxx'
    assert arts[0][3] == accounts[1]
    assert arts[0][4] == '0x0000000000000000000000000000000000000000'
    assert arts[0][5] == '5 ether'
    assert arts[0][6] == 'my art'
    assert arts[0][7] == 'my art desc'
    assert arts[0][8] != 0
    assert arts[0][9] != 0
