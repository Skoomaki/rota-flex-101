package com.rota.auth;

import com.rota.database.orm.staff.Role;
import java.util.Optional;

/**
 * Dummy class which represents user authentication.
 */
public class AuthenticationUtils {
  /**
   * Checks if the provided token is valid.
   * Only returns false if token is "false" (case insensitive).
   * @param token Authentication token.
   * @return Whether authentication was successful.
   */
  public static boolean validateToken(String token) {
    // This will only return false if the token is "false" (case insensitive)
    return !token.toLowerCase().equals("false");
  }

  /**
   * Extracts user information from the provided token.
   * @param token Authentication token.
   * @return User information if token is valid and if present.
   */
  public static Optional<Integer> getUserFromToken(String token) {
    Integer parsedToken;
    try {
      parsedToken = Integer.parseInt(token);
    } catch (NumberFormatException e) {
      return Optional.empty();
    }
    return Optional.of(parsedToken);
  }

  /**
   * TODO Temp solution needs to be changed to be more appropriate when auth is added to backend.
   * Get user role from token.
   * @param token Authentication token
   * @return {@link Role} of the user or <code>null</code> if token is not valid.
   */
  public static Optional<Role> getUserRoleFromToken(String token) {
    return validateToken(token)
        ? Optional.of(
          (token.length() % 2 == 0)
            ? Role.MANAGER
            : Role.USER
          )
        : Optional.empty();
  }

  /**
   * TODO Temp solution needs to be changed to be more appropriate when auth is added to backend.
   * Get user role from token.
   * @param token Authentication token
   * @return {@link Role} of the user or <code>null</code> if token is not valid.
   */
  public static Optional<Role> getUserRoleFromToken(String token) {
    return validateToken(token)
        ? Optional.of(
          (token.length() % 2 == 0)
            ? Role.MANAGER
            : Role.USER
          )
        : Optional.empty();
  }
}
