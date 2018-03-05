import boto3
import os
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):

    # Get post id
    postId = event["postId"]

    dynamodb = boto3.resource('dynamodb')

    # Table name
    table = dynamodb.Table(os.environ['DB_TABLE_NAME'])

    if postId=="*":
        # return all items
        items = table.scan()
    else:
        # update to work off text
        items = table.query(
            KeyConditionExpression=Key('id').eq(postId)
        )

    return items["Items"]
