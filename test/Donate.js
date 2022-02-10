const { expect } = require("chai");

// test data 
let Contract;
let hardhatContract;
let owner;
let address1;
let address2;
let address3;

// deploy donate contract
beforeEach(async function () {
    Contract = await ethers.getContractFactory("Donate");
    [owner, address1, address2, address3] = await ethers.getSigners();

    hardhatContract = await Contract.deploy();
});



// checking the performance of donations and receiving donated sums
describe("Test donate contract", () => {
    
    // check donate without error.
    it("donate", async  () => {
        await hardhatContract
            .connect(address1)
            .donate({
                 value: ethers.utils.parseEther("10")
            })
        ;

        await hardhatContract
            .connect(address2)
            .donate({
                value: ethers.utils.parseEther("5")
            })
        ;

        await hardhatContract
            .connect(address1)
            .donate({
                value: ethers.utils.parseEther("12")
            })
        ;

        await hardhatContract
            .connect(address2)
            .donate({
                 value: ethers.utils.parseEther("11")
            })
        ;
    });

    // check owner withdraw to address.
    it("withdraw", async() => {
        await hardhatContract
            .connect(address1)
            .donate({
                value: ethers.utils.parseEther("10")
            })
        ;

        await hardhatContract
            .connect(address2)
            .donate({
                value: ethers.utils.parseEther("5")
            })
        ;

        await hardhatContract
            .connect(address1)
            .donate({
                value: ethers.utils.parseEther("12")
            })
        ;

        await hardhatContract
            .connect(address2)
            .donate({
                value: ethers.utils.parseEther("11")
            })
        ;

        await hardhatContract.connect(owner).withdraw(address3.address);

        const provider = waffle.provider;
        const balance0ETH = await provider.getBalance(address3.address);

        expect(balance0ETH).to.equal(ethers.utils.parseEther("10038"));
    });

    // check the donated address sum.
    it("address sum", async () => {
        await hardhatContract
            .connect(address1)
            .donate({
                value: ethers.utils.parseEther("15")
            })
        ;

        const sum = await hardhatContract.getAddressSum(address1.address);
        expect(sum).to.equal(ethers.utils.parseEther("15"));

        await hardhatContract
            .connect(address2)
            .donate({
                value: ethers.utils.parseEther("15")
            })
        ;

        await hardhatContract
            .connect(address2)
            .donate({
                value: ethers.utils.parseEther("5")
            })
        ;

        await hardhatContract
            .connect(address2)
            .donate({
                value: ethers.utils.parseEther("10")
            })
        ;


        const sum2 = await hardhatContract.getAddressSum(address2.address);
        expect(sum2).to.equal(ethers.utils.parseEther("30"));
    });

    // check the all donated addresses.
    it("all donated addresses", async ()=> {
        await hardhatContract
            .connect(address1)
            .donate({
                value: ethers.utils.parseEther("15")
            })
        ;

        await hardhatContract
            .connect(address2)
            .donate({
                value: ethers.utils.parseEther("15")
            })
        ;

        await hardhatContract
            .connect(address2)
            .donate({
                value: ethers.utils.parseEther("15")
            })
        ;

        await hardhatContract
            .connect(address1)
            .donate({
                value: ethers.utils.parseEther("40")
            })
        ;

        let addresses = await hardhatContract.getAddresses();
        expect(addresses.length).to.equal(2);
        expect(addresses[0]).to.equal(address1.address);
        expect(addresses[1]).to.equal(address2.address);
    });
});

