package com.nghiahd.server.common;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class SaveFileUtils {
    public static boolean saveFile(String uploadDir, String fileName, MultipartFile multipartFile) {
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectories(uploadPath);
            } catch (Exception ex) {
                ex.printStackTrace();
                return false;
            }
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            ioe.printStackTrace();
            return false;
        }
        return true;
    }

    public static String createNameFile(String newName, String oldNameFile) {
        String[] arr = oldNameFile.split("\\.");
        String postfix = "PNG";
        if (arr.length > 1) {
            postfix = arr[arr.length - 1];
        }
        return newName.replace(":", "-") + "." + postfix;
    }

    public static String createNameFile(String newName, String oldNameFile, String prefix) {
        String[] arr = oldNameFile.split("\\.");
        String postfix = "PNG";
        if (arr.length > 1) {
            postfix = arr[arr.length - 1];
        }
        return prefix + newName.replace(":", "-") + "." + postfix;
    }

}
