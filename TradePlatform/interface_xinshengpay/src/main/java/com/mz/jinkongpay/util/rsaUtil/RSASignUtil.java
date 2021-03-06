package com.mz.jinkongpay.util.rsaUtil;




import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PublicKey;
import java.security.Signature;
import java.security.SignatureException;
import java.security.cert.CertificateEncodingException;
import java.security.cert.CertificateException;
import java.security.cert.CertificateExpiredException;
import java.security.cert.CertificateFactory;
import java.security.cert.CertificateNotYetValidException;
import java.security.cert.X509Certificate;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;

import javax.crypto.Cipher;

import org.apache.commons.lang3.StringUtils;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.util.encoders.Base64;

public class RSASignUtil
{
  private String certFilePath = null;
  private String password = null;
  private String hexCert = null;
  private String rootCertPath = null;

  public RSASignUtil(String certFilePath, String password)
  {
    this.certFilePath = certFilePath;
    this.password = password;
  }

  public RSASignUtil(String rootCertPath)
  {
    this.rootCertPath = rootCertPath;
  }

  public RSASignUtil()
  {
  }

  public String sign(String indata, String encoding)
  {
    String singData = null;
    try
    {
      CAP12CertTool c = new CAP12CertTool(this.certFilePath, this.password);
      X509Certificate cert = c.getCert();
      byte[] si = c.getSignData(indata.getBytes(encoding));
      byte[] cr = cert.getEncoded();
      this.hexCert = HexStringByte.byteToHex(cr);
      singData = HexStringByte.byteToHex(si);
    }
    catch (CertificateEncodingException e) {
      e.printStackTrace();
    }
    catch (FileNotFoundException e) {
      e.printStackTrace();
    }
    catch (java.lang.SecurityException e) {
      e.printStackTrace();
    }
    catch (UnsupportedEncodingException e) {
      e.printStackTrace();
    }

    return singData;
  }

  public String getCertInfo()
  {
    return this.hexCert;
  }

  public boolean verify(String oridata, String signData, String svrCert, String encoding)
  {
    boolean res = false;
    try
    {
      byte[] signDataBytes = HexStringByte.hexToByte(signData.getBytes());
      byte[] inDataBytes = oridata.getBytes(encoding);

      byte[] signaturepem = checkPEM(signDataBytes);
      if (signaturepem != null) {
        signDataBytes = Base64.decode(signaturepem);
      }
      X509Certificate cert = getCertFromHexString(svrCert);
      if (cert != null) {
        PublicKey pubKey = cert.getPublicKey();
        Signature signet = Signature.getInstance("SHA1WITHRSA");
        signet.initVerify(pubKey);
        signet.update(inDataBytes);
        res = signet.verify(signDataBytes);
      }

    }
    catch (InvalidKeyException e)
    {
      e.printStackTrace();
    }
    catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    }
    catch (SignatureException e) {
      e.printStackTrace();
    }
    catch (java.lang.SecurityException e) {
      e.printStackTrace();
    }
    catch (UnsupportedEncodingException e) {
      e.printStackTrace();
    }

    return res;
  }

  public X509Certificate getCertfromPath(String crt_path)
    throws java.lang.SecurityException
  {
    X509Certificate cert = null;
    InputStream inStream = null;
    try {
      inStream = new FileInputStream(new File(crt_path));
      CertificateFactory cf = CertificateFactory.getInstance("X.509");
      cert = (X509Certificate)cf.generateCertificate(inStream);
    } catch (CertificateException e) {
      throw new java.lang.SecurityException(e.getMessage());
    } catch (FileNotFoundException e) {
      throw new java.lang.SecurityException(e.getMessage());
    }
    return cert;
  }

  public static PublicKey getPublicKeyfromPath(String svrCertpath) throws java.lang.SecurityException
  {
    X509Certificate cert = null;
    InputStream inStream = null;
    try {
      inStream = new FileInputStream(new File(svrCertpath));
      CertificateFactory cf = CertificateFactory.getInstance("X.509");
      cert = (X509Certificate)cf.generateCertificate(inStream);
    }
    catch (CertificateException e) {
      throw new java.lang.SecurityException(e.getMessage());
    } catch (FileNotFoundException e) {
      throw new java.lang.SecurityException(e.getMessage());
    }
    return cert.getPublicKey();
  }

  public boolean verifyCert(X509Certificate userCert, X509Certificate rootCert) throws java.lang.SecurityException
  {
    boolean res = false;
    try {
      PublicKey rootKey = rootCert.getPublicKey();
      userCert.checkValidity();
      userCert.verify(rootKey);
      res = true;
      if (!(userCert.getIssuerDN().equals(rootCert.getSubjectDN())))
        res = false;
    } catch (CertificateExpiredException e) {
      throw new java.lang.SecurityException(e.getMessage());
    } catch (CertificateNotYetValidException e) {
      throw new java.lang.SecurityException(e.getMessage());
    } catch (InvalidKeyException e) {
      throw new java.lang.SecurityException(e.getMessage());
    } catch (CertificateException e) {
      throw new java.lang.SecurityException(e.getMessage());
    } catch (NoSuchAlgorithmException e) {
      throw new java.lang.SecurityException(e.getMessage());
    } catch (NoSuchProviderException e) {
      throw new java.lang.SecurityException(e.getMessage());
    } catch (SignatureException e) {
      throw new java.lang.SecurityException(e.getMessage());
    }

    return res;
  }

  private X509Certificate getCertFromHexString(String hexCert) throws java.lang.SecurityException
  {
    ByteArrayInputStream bIn = null;
    X509Certificate certobj = null;
    try {
      byte[] cert = HexStringByte.hexToByte(hexCert.getBytes());
      CertificateFactory fact = CertificateFactory.getInstance("X.509");
      bIn = new ByteArrayInputStream(cert);
      certobj = (X509Certificate)fact.generateCertificate(bIn);
      bIn.close();
      bIn = null;
    } catch (CertificateException localIOException2) {
    	localIOException2.printStackTrace();
    } catch (IOException localIOException3) {
    	localIOException3.printStackTrace();
    } finally {
      try {
        if (bIn != null)
          bIn.close();
      } catch (IOException localIOException4) {
      }
    }
    return certobj;
  }

  public static byte[] checkPEM(byte[] paramArrayOfByte) {
    String str1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+= \r\n-";
    for (int i = 0; i < paramArrayOfByte.length; ++i)
      if (str1.indexOf(paramArrayOfByte[i]) == -1)
        return null;
    StringBuffer localStringBuffer = new StringBuffer(paramArrayOfByte.length);

    String str2 = new String(paramArrayOfByte);
    for (int j = 0; j < str2.length(); ++j) {
      if ((str2.charAt(j) == ' ') || (str2.charAt(j) == '\r') || 
        (str2
        .charAt(j) == 
        '\n')) continue;
      localStringBuffer.append(str2.charAt(j)); }
    return localStringBuffer.toString().getBytes();
  }

  public String getFormValue(String respMsg, String name) {
    String[] resArr = StringUtils.split(respMsg, "&");

    Map resMap = new HashMap();
    for (int i = 0; i < resArr.length; ++i) {
      String data = resArr[i];
      int index = StringUtils.indexOf(data, '=');
      String nm = StringUtils.substring(data, 0, index);
      String val = StringUtils.substring(data, index + 1);
      resMap.put(nm, val);
    }

    return (((String)resMap.get(name) == null) ? "" : 
      (String)resMap
      .get(name));
  }

  public String getValue(String respMsg, String name)
  {
    String[] resArr = StringUtils.split(respMsg, "&");

    Map resMap = new HashMap();
    for (int i = 0; i < resArr.length; ++i) {
      String data = resArr[i];
      int index = StringUtils.indexOf(data, '=');
      String nm = StringUtils.substring(data, 0, index);
      String val = StringUtils.substring(data, index + 1);
      resMap.put(nm, val);
    }

    return (((String)resMap.get(name) == null) ? "" : 
      (String)resMap
      .get(name));
  }

  public Map coverString2Map(String respMsg)
  {
    String[] resArr = StringUtils.split(respMsg, "&");

    Map resMap = new HashMap();
    for (int i = 0; i < resArr.length; ++i) {
      String data = resArr[i];
      int index = StringUtils.indexOf(data, '=');
      String nm = StringUtils.substring(data, 0, index);
      String val = StringUtils.substring(data, index + 1);
      resMap.put(nm, val);
    }
    return resMap;
  }

  public static String coverMap2String(Map<String, String> data) {
    TreeMap tree = new TreeMap();
    Iterator it = data.entrySet().iterator();
    while (it.hasNext()) {
      Map.Entry en = (Map.Entry)it.next();
      String value = "";
      if ((!("merchantSign".equals(((String)en.getKey()).trim()))) && 
        (!("serverSign"
        .equals(((String)en
        .getKey()).trim()))) && 
        (!("serverCert"
        .equals(((String)en
        .getKey()).trim())))) {
        tree.put(en.getKey(), en.getValue());
      }
    }
    it = tree.entrySet().iterator();
    StringBuffer sf = new StringBuffer();
    while (it.hasNext()) {
      Map.Entry en = (Map.Entry)it.next();
      sf.append(((String)en.getKey()) + "="
         + ((String)en.getValue()) + "&");
    }

    return sf.substring(0, sf.length() - 1);
  }

  public static String encryptData(String dataString, String encoding, String svrCertPath) {
    byte[] data = null;
    try {
      data = encryptedPin(getPublicKeyfromPath(svrCertPath), dataString.getBytes(encoding));
      return new String(base64Encode(data), encoding);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return "";
  }

  public static byte[] encryptedPin(PublicKey publicKey, byte[] plainPin) throws Exception
  {
    try {
      Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding", new BouncyCastleProvider());

      cipher.init(1, publicKey);
      int blockSize = cipher.getBlockSize();
      int outputSize = cipher.getOutputSize(plainPin.length);
      int leavedSize = plainPin.length % blockSize;
      int blocksSize = (leavedSize != 0) ? plainPin.length / blockSize + 1 : plainPin.length / blockSize;

      byte[] raw = new byte[outputSize * blocksSize];
      int i = 0;
      while (plainPin.length - (i * blockSize) > 0) {
        if (plainPin.length - (i * blockSize) > blockSize) {
          cipher.doFinal(plainPin, i * blockSize, blockSize, raw, i * outputSize);
        }
        else {
          cipher.doFinal(plainPin, i * blockSize, plainPin.length - (i * blockSize), raw, i * outputSize);
        }

        ++i;
      }
      return raw;
    } catch (Exception e) {
      throw new Exception(e.getMessage());
    }
  }

  public static byte[] base64Encode(byte[] inputByte) throws IOException {
    return Base64.encode(inputByte);
  }
}