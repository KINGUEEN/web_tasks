package test.data;
import java.util.*;
import java.math.*;
import java.io.*;
import java.math.BigInteger;

public class Fibonacci {
	public static void main(String[] args) {
		BigInteger fib[] = new BigInteger[100];
		fib[0] = fib[1] =BigInteger.ONE;
		for (int i = 2; i < 100; i++) {
			fib[i] = fib[i - 1].add(fib[i - 2]);
		}
		for(int j=0;j<100;j++){
			System.out.println(fib[j]);
		}
	}
}
