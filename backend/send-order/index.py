import os
import json
import urllib.request

def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта в Telegram @petia_progasi"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()

    if not name or not phone:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Заполните имя и телефон'}, ensure_ascii=False)}

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = '@petia_progasi'

    text = (
        f"🛒 Новая заявка на KAC PDW!\n\n"
        f"👤 Имя: {name}\n"
        f"📞 Телефон: {phone}"
    )

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({'chat_id': chat_id, 'text': text}).encode()
    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'}, method='POST')
    urllib.request.urlopen(req)

    return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'ok': True})}