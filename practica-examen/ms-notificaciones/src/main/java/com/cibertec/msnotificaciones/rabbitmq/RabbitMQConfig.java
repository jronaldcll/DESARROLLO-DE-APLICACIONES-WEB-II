package com.cibertec.msnotificaciones.rabbitmq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// @Configuration registra recursos AMQP del lado consumidor.
// En AWS esto se parece a definir SNS/SQS y suscripciones en la infraestructura del servicio.
@Configuration
public class RabbitMQConfig {

	public static final String STOCK_EXCHANGE = "stock-exchange";
	public static final String NOTIFICATION_EXCHANGE = "notification-exchange";
	public static final String STOCK_RESERVE_QUEUE = "stock-reserve-queue";
	public static final String STOCK_LOW_QUEUE = "stock-low-queue";
	public static final String PURCHASE_EMAIL_QUEUE = "purchase-email-queue";
	public static final String STOCK_RESERVE_ROUTING_KEY = "stock.reserve";
	public static final String STOCK_LOW_ROUTING_KEY = "stock.low";
	public static final String PURCHASE_EMAIL_ROUTING_KEY = "email.purchase.thanks";

	@Bean
	public DirectExchange stockExchange() {
		return new DirectExchange(STOCK_EXCHANGE);
	}

	@Bean
	public DirectExchange notificationExchange() {
		return new DirectExchange(NOTIFICATION_EXCHANGE);
	}

	@Bean
	public Queue stockReserveQueue() {
		return new Queue(STOCK_RESERVE_QUEUE);
	}

	@Bean
	public Queue stockLowQueue() {
		return new Queue(STOCK_LOW_QUEUE);
	}

	@Bean
	public Queue purchaseEmailQueue() {
		return new Queue(PURCHASE_EMAIL_QUEUE);
	}

	@Bean
	public Binding stockReserveBinding(Queue stockReserveQueue, DirectExchange stockExchange) {
		return BindingBuilder.bind(stockReserveQueue)
				.to(stockExchange)
				.with(STOCK_RESERVE_ROUTING_KEY);
	}

	@Bean
	public Binding stockLowBinding(Queue stockLowQueue, DirectExchange stockExchange) {
		return BindingBuilder.bind(stockLowQueue)
				.to(stockExchange)
				.with(STOCK_LOW_ROUTING_KEY);
	}

	@Bean
	public Binding purchaseEmailBinding(Queue purchaseEmailQueue, DirectExchange notificationExchange) {
		return BindingBuilder.bind(purchaseEmailQueue)
				.to(notificationExchange)
				.with(PURCHASE_EMAIL_ROUTING_KEY);
	}

	@Bean
	public MessageConverter jsonMessageConverter() {
		return new Jackson2JsonMessageConverter();
	}
}
