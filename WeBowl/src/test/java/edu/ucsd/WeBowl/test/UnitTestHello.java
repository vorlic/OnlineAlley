package edu.ucsd.WeBowl.test;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

public class UnitTestHello {

	@Test
	public void verifyThatStringHelloEqualsHello() {
		assertEquals("hello", "hello");
	}
	
	@Test
	public void verifyThatStringHelloEqualsHelloAndItFails() {
		assertEquals("hello", "Hello");
	}
}
