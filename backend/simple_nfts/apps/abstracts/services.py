import json

from web3 import Web3


class ArtHelper:
    """
        Class for work with Web3
    """
    STATUS_FOR_SALE = 1
    STATUS_SOLD = 0

    def __init__(
        self,
        network,
        account_address,
        private_key,
        contract_file,
        contract_address
    ) -> None:
        self.account_address = account_address
        self.private_key = private_key

        self.w3 = Web3(Web3.HTTPProvider(network))
        self.w3.eth.default_account = account_address

        with open(contract_file, "r") as file:
            simple_nft_file = file.read()

        json_obj = json.loads(simple_nft_file)
        self.contract = self.w3.eth.contract(
            contract_address, abi=json_obj["abi"])

    def get_all_nft(self):
        arr = self.contract.functions.getAllArts().call()
        arts = []
        for d in arr:
            art = {
                'status': d[0],
                'uri': d[1],
                'owner': d[2],
                'price': d[3],
                'date_of_creation': d[4],
                'title': d[5],
            }
            arts.append(art)

        return arts

    def create_nft(self, **kwargs):
        dict_transaction = {
            'from': self.account_address,
            'nonce': self.w3.eth.get_transaction_count(self.account_address),
        }

        transaction = self.contract.functions.createArt(
            kwargs['uri'],
            kwargs['seller'],
            kwargs['price'],
            kwargs['date_of_creation'],
            kwargs['title']
        ).build_transaction(dict_transaction)

        signed_txn = self.w3.eth.account.sign_transaction(
            transaction, self.private_key)

        txn_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)

        receipt = self.w3.eth.wait_for_transaction_receipt(txn_hash)

        return receipt

    def buy_nft(self, **kwargs):
        dict_transaction = {
            'from': self.account_address,
            'nonce': self.w3.eth.get_transaction_count(self.account_address),
        }

        transaction = self.contract.functions.buyArt(
            kwargs['buyer'],
            kwargs['tokenId'],
            kwargs['markup']
        ).build_transaction(dict_transaction)

        signed_txn = self.w3.eth.account.sign_transaction(
            transaction, self.private_key)

        txn_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)

        receipt = self.w3.eth.wait_for_transaction_receipt(txn_hash)

        return receipt
