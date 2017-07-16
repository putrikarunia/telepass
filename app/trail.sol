
pragma solidity ^0.4.4;

contract PinCoin {
    mapping (address => uint) public balances;
	function PinCoin() {
		balances[msg.sender] = 10000;
	}
	function sendToken(address receiver, uint amount) returns(bool successful){
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		return false;
	}
}
contract Product {

    struct Buyer {
        address addr;
    }

    bytes32 name;
    uint price;
    address owner;

    function Product(uint _price, bytes32 _name) {
        owner = msg.sender; //save owner address
        price = _price;
        name = _name;
    }

    function Buy(address coinAddress) returns (bool success){
        Buyer memory newBuyer;
        newBuyer.addr = msg.sender;
        PinCoin coin = PinCoin(coinAddress);
        if(coin.sendToken(owner, price))
        {
            owner = msg.sender;
            return true;
        } else {
            return false;
        }
    }



}
