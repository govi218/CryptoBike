pragma solidity 0.5.0;

import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract CryptoBike is ERC721Token, Ownable {

    /* Events */
    event BikeRented(string owner_id, string renter_id);
    event BikeReturned(string owner_id, string renter_id);

    // /* Events */
    // string public constant name = "CryptoBike";
    // string public constant symbol = "BIKE";

    /* Data Types */
    uint256 currentPrice = 3000000000000000;
    mapping (uint => Bike) bikes;
    uint numBikes;
    address public owner;

    // struct Trip {
    //     string rent_address; // address where rented
    //     int256 rf_id; // generated RFID
    //     string start_time; // timestamp of rental start
    //     string end_time; // timestamp of rental end
    //     string renter_id; // renter's ID
    //     string renter_name;
    //     string renter_email;
    //     string renter_phone;
    // }
    
    struct Bike {
        string model; // bike model
        string owner_id; // owner's ID
        string owner_name; // owner's ID
        // mapping(uint => Trip) trips;
        uint numTrips;
        // Trip[] trips;
        bool active_trip;
        uint bike_id; // bike's ID
        string renter_name;
        string renter_email;
        string renter_phone;
    }
    
    constructor() public ERC721Token("CryptoBike", "BIKE") {
        owner = msg.sender; // The Sender is the Owner; Ethereum Address of the Owner
    }
    
    function add_bike(string memory owner_id, string memory owner_name, string memory model) public returns (uint bike_id){
        bike_id = numBikes ++;
        // trips[0] = Trip("",0,"","","","","","");
        bikes[bike_id] = Bike(model, owner_id, owner_name, 0, false, bike_id, "", "", "");
    }
    
    function rent_bike(uint bike_id, string memory renter_name, string memory renter_email, string memory renter_phone) private returns (bool success) {
        Bike storage bike = bikes[bike_id];

        // fail-safe
        if(bike.active_trip == true) {
            return false;
        }

        bike.renter_name = renter_name;
        bike.renter_email = renter_email;
        bike.renter_phone = renter_phone;
        bike.active_trip = true;
        
        return true;
    }
    
    function return_bike(uint bike_id) public returns (bool success) {
        Bike storage bike = bikes[bike_id];
        // fail-safe
        if(bike.active_trip == false) {
            return false;
        }
        
        bike.renter_name = "";
        bike.renter_email = "";
        bike.renter_phone = "";
        bike.active_trip = false;
        bike.numTrips = bike.numTrips++;
        
        return true;
        // Trip storage trip = bike.trips[trip_id];
        // trip.end_time = end_time;
    }
    
}