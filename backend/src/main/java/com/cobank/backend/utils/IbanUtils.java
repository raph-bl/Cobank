package com.cobank.backend.utils;

import java.math.BigInteger;
import java.security.SecureRandom;

public class IbanUtils {

    private IbanUtils() {}

    private static final String BANK_CODE = "12345";
    private static final String BRANCH_CODE = "00001";

    private static final SecureRandom RANDOM = new SecureRandom();

    /** Longueur du numéro de compte dans un BBAN français. */
    private static final int ACCOUNT_NUMBER_LENGTH = 11;

    public static String generate() {
        String accountNumber = randomAccountNumber();

        // BBAN provisoire sans sa clé RIB
        String ribBase = BANK_CODE + BRANCH_CODE + accountNumber;

        int ribKey = 97 - new BigInteger(
                ribBase + "00"
        ).mod(BigInteger.valueOf(97)).intValue();

        String bban = ribBase + String.format("%02d", ribKey);

        String rearranged = bban + "FR00";
        String numeric = charsToInt(rearranged);

        int ibanKey = 98 - new BigInteger(numeric)
                .mod(BigInteger.valueOf(97)).intValue();

        return String.format("FR%02d%s", ibanKey, bban);
    }


    private static String randomAccountNumber() {
        StringBuilder sb = new StringBuilder(ACCOUNT_NUMBER_LENGTH);

        // premier chiffre non nul, pour éviter un numéro à rallonge de zéros
        sb.append(1 + RANDOM.nextInt(9));

        for (int i = 1; i < ACCOUNT_NUMBER_LENGTH; i++) {
            sb.append(RANDOM.nextInt(10));
        }

        return sb.toString();
    }


    private static String charsToInt(String input) {
        StringBuilder result = new StringBuilder();

        for (char c : input.toCharArray()) {
            if (c >= 'A' && c <= 'Z') {
                result.append(c - 'A' + 10);
            } else {
                result.append(c);
            }
        }

        return result.toString();
    }
}
