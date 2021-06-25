const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();
describe("Student", () => {
    describe("GET /",()=>{
        it("should get all data record",(done)=>{
            chai.request(app).get('/inventori')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object');
                    done();
                });
        });

        // it("should get a single record", (done) => {
        //     // const 
        // })
    })
})