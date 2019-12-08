import { expect } from 'chai';
import User from '../models/users';


describe('User', function() {
    it('should be invalid if firstName is empty', function(done) {
        const user = new User();
        user.validate(function(err) {
            expect(err.errors.firstName).to.exist;
            done();
        });
    });

    it('should be invalid if lastName is empty', function(done) {
        const user = new User();
        user.validate(function(err) {
            expect(err.errors.lastName).to.exist;
            done();
        });
    });

    it('should be invalid if email is empty', function(done) {
        const user = new User();
        user.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if passwordHash is empty', function(done) {
        const user = new User();
        user.validate(function(err) {
            expect(err.errors.passwordHash).to.exist;
            done();
        });
    });
});