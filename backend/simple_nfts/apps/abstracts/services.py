import json

from web3 import Web3


class ArtSerivce:
    """
        Art Serivice
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

    def buy_art(self, **kwargs):
        dict_transaction = {
            'from': Web3.toChecksumAddress(self.account_address),
            'nonce': self.w3.eth.get_transaction_count(self.account_address),
        }
        try:
            transaction = self.contract.functions.buyArt(
                kwargs['buyer'],
                kwargs['tokenId'],
                kwargs['markup']
            ).buildTransaction(dict_transaction)
        except Exception as e:
            return e, None

        signed_txn = self.w3.eth.account.sign_transaction(
            transaction, self.private_key)

        txn_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)

        receipt = self.w3.eth.wait_for_transaction_receipt(txn_hash)

        return None, receipt
