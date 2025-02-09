import bcrypt from 'bcrypt'

// function to hash the password

export const hashPassword = async(passowrd)=>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passowrd,saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log('Error while hashing the password:', error);
        
    }
};


// function to compare a plain password with the hashed password

export const comparePassword = async(password, hashedPassword)=>{
    try {
        const isMatch = await bcrypt.compare(password,hashedPassword);
        return isMatch;  // Returns true if passwords match, false otherwise
    } catch (error) {
        console.log(`Error while comparing the password: ${error}`)
    }
}