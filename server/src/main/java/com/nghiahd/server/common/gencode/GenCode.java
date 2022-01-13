package com.nghiahd.server.common.gencode;

import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.Configurable;
import org.hibernate.id.IdentifierGenerator;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.Type;

import java.io.Serializable;
import java.util.Properties;


public class GenCode implements IdentifierGenerator, Configurable {
    private String prefix;

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        String query = String.format("select count(1) from %s", obj.getClass().getSimpleName());

        Long count = (Long)session.createQuery(query).getSingleResult();

        String code = prefix + String.format("%08d", count);;

        return code;




//        Connection connection = session.connection();
//        try {
//            Statement statement=connection.createStatement();
//
//            ResultSet rs=statement.executeQuery("select count(1) from demo.Department");
//
//            if(rs.next())
//            {
//                int id=rs.getInt(1)+101;
//                String generatedId = prefix + new Integer(id).toString();
//                System.out.println("Generated Id: " + generatedId);
//                return generatedId;
//            }
//        } catch (SQLException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
    }

    @Override
    public void configure(Type type, Properties properties, ServiceRegistry serviceRegistry) throws MappingException {
        prefix = properties.getProperty("prefix");
    }
}
