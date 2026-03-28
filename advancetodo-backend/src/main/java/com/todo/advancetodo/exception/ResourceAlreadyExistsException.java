package com.todo.advancetodo.exception;

public class ResourceAlreadyExistsException extends RuntimeException{
    public ResourceAlreadyExistsException(String message){
        super(message); 
    }
}
