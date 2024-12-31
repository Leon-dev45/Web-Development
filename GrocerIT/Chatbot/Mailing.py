import smtplib


class Mailer:
    def sendMail(self, email, msg):
        content = msg
        mail = smtplib.SMTP("smtp.gmail.com", 587)
        mail.ehlo()
        mail.starttls()
        sender = "myfess123@gmail.com"
        recipient = "myfess123@gmail.com"
        mail.login("myfess123@gmail.com", "lqrhwymnzmqobpgd")
        header = (
            "From:" + email + "\n" + "To:" + email + "\n" + "subject:Admin Login\n"
        )
        content = header + content
        mail.sendmail(sender, recipient, content)
        mail.close()


# if __name__ == "__main__":
#     mail = Mailer()
#     mail.sendMail("Leon", "thelegend4501@gmail.com", "Hello World")
