/* eslint-disable prettier/prettier */
import {IsEmail, IsNotEmpty, IsString} from 'class-validator' ;

export class LoginDto {
    @IsString()
        @IsNotEmpty({message : 'Email field is required'})
        //@Length(1, null, {})
    @IsEmail({}, {
        message: "$value  is not a valid Email address"
    })
    email:string ;

    @IsString()
    @IsNotEmpty({message : 'Password field is required'})
    password: string
}


export class RegisterDto {
     @IsString()
        @IsNotEmpty({message : 'Email field is required'})
        //@Length(1, null, {})
    @IsEmail({}, {
        message: "$value  is not a valid Email address"
    })
    email:string ;

    @IsString()
    @IsNotEmpty({message : 'Password field is required'})
    password: string
}