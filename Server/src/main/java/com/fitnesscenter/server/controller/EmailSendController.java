package com.fitnesscenter.server.controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fitnesscenter.server.service.EmailService;

@RestController
@RequestMapping("/mail")
public class EmailSendController {
    private EmailService emailService;

    public EmailSendController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public String sendMail(
    @RequestParam String to,
    @RequestParam String[] cc,
    @RequestParam String subject,
    @RequestParam String body) {
return emailService.sendMail( to, cc, subject, body);
}

}