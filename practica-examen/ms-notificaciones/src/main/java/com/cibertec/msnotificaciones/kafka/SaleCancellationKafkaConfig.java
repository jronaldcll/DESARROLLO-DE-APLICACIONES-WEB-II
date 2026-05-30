package com.cibertec.msnotificaciones.kafka;

import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.Map;

@Configuration
@ConditionalOnProperty(name = "messaging.consumers.enabled", havingValue = "true")
public class SaleCancellationKafkaConfig {

	@Bean
	public ConsumerFactory<String, SaleCancellationRequestedEvent> saleCancellationConsumerFactory(
			KafkaProperties kafkaProperties
	) {
		Map<String, Object> consumerProperties = kafkaProperties.buildConsumerProperties(null);
		consumerProperties.keySet().removeIf(key -> key.startsWith("spring.json."));

		JsonDeserializer<SaleCancellationRequestedEvent> valueDeserializer =
				new JsonDeserializer<>(SaleCancellationRequestedEvent.class, false);
		valueDeserializer.addTrustedPackages("com.cibertec.mspedidos.kafka", "com.cibertec.msnotificaciones.kafka");

		return new DefaultKafkaConsumerFactory<>(
				consumerProperties,
				new StringDeserializer(),
				valueDeserializer
		);
	}

	@Bean
	public ConcurrentKafkaListenerContainerFactory<String, SaleCancellationRequestedEvent>
	saleCancellationKafkaListenerContainerFactory(
			ConsumerFactory<String, SaleCancellationRequestedEvent> saleCancellationConsumerFactory
	) {
		ConcurrentKafkaListenerContainerFactory<String, SaleCancellationRequestedEvent> factory =
				new ConcurrentKafkaListenerContainerFactory<>();
		factory.setConsumerFactory(saleCancellationConsumerFactory);
		return factory;
	}
}
